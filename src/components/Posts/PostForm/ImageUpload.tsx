/* eslint-disable @next/next/no-img-element */
import { Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';

type ImageUploadProps = {
  handleSelectedImage: (value: string) => void;
  selectedFile: string | undefined;
  handleSelectedTab: (value: string) => void;
};

const ImageUpload = ({
  handleSelectedImage,
  selectedFile,
  handleSelectedTab,
}: ImageUploadProps) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => inputFileRef.current?.click();

  const onSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        handleSelectedImage(readerEvent.target.result as string);
      }
    };
  };

  return (
    <Flex justify='center' direction='column' align='center' width='100%'>
      {selectedFile ? (
        <>
          <Image alt='' src={selectedFile} maxWidth='400px' maxHeight='400px' />
          <Stack direction='row' mt={4}>
            <Button
              height='28px'
              onClick={() => handleSelectedTab('Publication')}
            >
              Retour à la publication
            </Button>
            <Button
              variant='outline'
              height='28px'
              onClick={() => handleSelectedImage('')}
            >
              Supprimer
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify='center'
          align='center'
          p={20}
          border='1px dashed'
          borderColor='gray.200'
          width='100%'
          borderRadius={4}
        >
          <Text fontSize='12pt' mr='8px' color='blue.500'>
            Sélectionnez une image
          </Text>
          <Button variant='outline' height='28px' onClick={handleClick}>
            Mettre en ligne
          </Button>
          <input
            type='file'
            hidden
            ref={inputFileRef}
            onChange={onSelectImage}
          />
          <img alt='' src={selectedFile} />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
