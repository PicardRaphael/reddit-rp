import { Flex, Icon, Image, MenuItem } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import useDirectory from '../../../hooks/useDirectory';

type DirectoryItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}: DirectoryItemProps) => {
  const { onSelectMenuItem } = useDirectory();
  return (
    <MenuItem
      width='100%'
      fontSize='10pt'
      _hover={{ bg: 'gray.100' }}
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL })
      }
    >
      <Flex alignItems='center'>
        {imageURL ? (
          <Image
            alt=''
            borderRadius='full'
            boxSize='18px'
            src={imageURL}
            mr={2}
          />
        ) : (
          <Icon fontSize={20} mr={2} as={icon} color={iconColor} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};
export default MenuListItem;
