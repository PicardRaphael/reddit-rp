import { Alert, AlertIcon, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { postsState } from '../../../atoms/postsAtom';
import { firestore, storage } from '../../../firebase/clientApp';
import { Post, PostForm } from '../../../types/post.types';
import { postSchema } from '../../../utils/postSchema';
import { postTabsForm } from '../../../utils/postTabsForm';
import ImageUpload from './ImageUpload';

import TabItem from './TabItem';
import TextInputs from './TextInputs';

type NewPostFormProps = {
  communityId: string;
  communityImageURL?: string;
  user: User;
};
const NewPostForm = ({
  communityId,
  communityImageURL,
  user,
}: NewPostFormProps) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(postTabsForm[0].key);
  const [selectedFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const setPostItems = useSetRecoilState(postsState);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostForm>({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = async (values: PostForm) => {
    const { community } = router.query;
    const newPost: Omit<Post, 'id'> = {
      communityId,
      communityImageURL: communityImageURL || '',
      creatorId: user.uid,
      userDisplayText: user.email!.split('@')[0],
      title: values.title,
      body: values.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
      editedAt: serverTimestamp() as Timestamp,
    };
    try {
      setLoading(true);
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url');
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, { imageURL: downloadURL });
      }
      setPostItems((prev) => ({
        ...prev,
        postUpdateRequired: true,
      }));
      router.back();
    } catch (error: any) {
      console.log('onSubmit error', error.message);
    }
    setLoading(false);
  };

  return (
    <Flex direction='column' bg='white' borderRadius={4} mt={2}>
      <Flex width='100%'>
        {postTabsForm.map((item) => (
          <TabItem
            key={item.key}
            item={item}
            selected={item.key === selectedTab}
            setSelectedTab={() => setSelectedTab(item.key)}
          />
        ))}
      </Flex>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: '100%', padding: '16px' }}
      >
        {selectedTab === 'post' && (
          <>
            <TextInputs
              errors={errors}
              titleRegister={register('title')}
              bodyRegister={register('body')}
            />
            <Stack>
              <Button
                height='34px'
                padding='0px 30px'
                disabled={!watch('title')}
                isLoading={loading || isSubmitting}
                type='submit'
                mt={3}
                alignSelf='end'
              >
                Post
              </Button>
            </Stack>
          </>
        )}
        {selectedTab === 'image' && (
          <ImageUpload
            selectedFile={selectedFile}
            handleSelectedImage={setSelectedFile}
            handleSelectedTab={setSelectedTab}
          />
        )}
      </form>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <Text mr={2}>Erreur lors de la création d'un poste</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
