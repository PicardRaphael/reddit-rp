import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaReddit } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';
import { useSetRecoilState } from 'recoil';
import { communityState } from '../../atoms/communitiesAtom';
import { auth, firestore, storage } from '../../firebase/clientApp';
import { Community } from '../../types/communities.types';

type AboutProps = {
  communityData: Community;
  pt?: number;
  onCreatePage?: boolean;
  loading?: boolean;
};

const About = ({ communityData, pt, onCreatePage, loading }: AboutProps) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const selectFileRef = useRef<HTMLInputElement>(null);
  const setCommunityStateValue = useSetRecoilState(communityState);

  const [selectedFile, setSelectedFile] = useState<string>();

  const [imageLoading, setImageLoading] = useState(false);

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
  };

  const updateImage = async () => {
    if (!selectedFile) return;
    setImageLoading(true);
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, 'communities', communityData.id), {
        imageURL: downloadURL,
      });

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        },
      }));
    } catch (error: any) {
      console.log('updateImage error', error.message);
    }

    setImageLoading(false);
  };

  return (
    <Box pt={pt} position='sticky' top='14px'>
      <Flex
        justify='space-between'
        align='center'
        p={3}
        color='white'
        bg='blue.400'
        borderRadius='4px 4px 0px 0px'
      >
        <Text fontSize='10pt' fontWeight={700}>
          À propos de la communauté
        </Text>
        <Icon as={HiOutlineDotsHorizontal} cursor='pointer' />
      </Flex>
      <Flex direction='column' p={3} bg='white' borderRadius='0px 0px 4px 4px'>
        {loading ? (
          <Stack mt={2}>
            <SkeletonCircle size='10' />
            <Skeleton height='10px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
          </Stack>
        ) : (
          <>
            {user?.uid === communityData?.creatorId && (
              <Box
                bg='gray.100'
                width='100%'
                p={2}
                borderRadius={4}
                border='1px solid'
                borderColor='gray.300'
                cursor='pointer'
              >
                <Text fontSize='9pt' fontWeight={700} color='blue.500'>
                  Ajouter une description
                </Text>
              </Box>
            )}
            <Stack spacing={2}>
              <Flex width='100%' p={2} fontWeight={600} fontSize='10pt'>
                <Flex direction='column' flexGrow={1}>
                  <Text>
                    {communityData?.numberOfMembers?.toLocaleString()}
                  </Text>
                  <Text>Membres</Text>
                </Flex>
                <Flex direction='column' flexGrow={1}>
                  <Text>1</Text>
                  <Text>En ligne</Text>
                </Flex>
              </Flex>
              <Divider />
              <Flex
                align='center'
                width='100%'
                p={1}
                fontWeight={500}
                fontSize='10pt'
              >
                <Icon as={RiCakeLine} mr={2} fontSize={18} />
                {communityData?.createdAt && (
                  <Text>
                    Créé le{' '}
                    {moment(
                      new Date(communityData.createdAt!.seconds * 1000)
                    ).format('DD MMM YYYY')}
                  </Text>
                )}
              </Flex>
              {!onCreatePage && (
                <Link href={`/r/${router.query.community}/submit`}>
                  <Button mt={3} height='30px'>
                    Créer une publication
                  </Button>
                </Link>
              )}
              {user?.uid === communityData?.creatorId && (
                <>
                  <Divider />
                  <Stack fontSize='10pt' spacing={1}>
                    <Text fontWeight={600}>Admin</Text>
                    <Flex align='center' justify='space-between'>
                      <Text
                        color='blue.500'
                        cursor='pointer'
                        _hover={{ textDecoration: 'underline' }}
                        onClick={() => selectFileRef.current?.click()}
                      >
                        Changer l'image
                      </Text>
                      {communityData?.imageURL || selectedFile ? (
                        <Image
                          borderRadius='full'
                          boxSize='40px'
                          src={selectedFile || communityData?.imageURL}
                          alt='Dan Abramov'
                        />
                      ) : (
                        <Icon
                          as={FaReddit}
                          fontSize={40}
                          color='brand.100'
                          mr={2}
                        />
                      )}
                    </Flex>
                    {selectedFile &&
                      (imageLoading ? (
                        <Spinner />
                      ) : (
                        <Text cursor='pointer' onClick={updateImage}>
                          Sauvegarder
                        </Text>
                      ))}
                    <input
                      id='file-upload'
                      type='file'
                      accept='image/x-png,image/gif,image/jpeg'
                      hidden
                      ref={selectFileRef}
                      onChange={onSelectImage}
                    />
                  </Stack>
                </>
              )}
            </Stack>
          </>
        )}
      </Flex>
    </Box>
  );
};
export default About;
