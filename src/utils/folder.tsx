import PinkFolderBigIcon from '@svg/folder/pink-folder-big-icon.svg';
import PinkFolderSmallIcon from '@svg/folder/pink-folder-small-icon.svg';
import BlueFolderBigIcon from '@svg/folder/blue-folder-big-icon.svg';
import BlueFolderSmallIcon from '@svg/folder/blue-folder-small-icon.svg';
import YellowFolderBigIcon from '@svg/folder/yellow-folder-big-icon.svg';
import YellowFolderSmallIcon from '@svg/folder/yellow-folder-small-icon.svg';
import PurpleFolderBigIcon from '@svg/folder/purple-folder-big-icon.svg';
import PurpleFolderSmallIcon from '@svg/folder/purple-folder-small-icon.svg';
import GreenFolderBigIcon from '@svg/folder/green-folder-big-icon.svg';
import GreenFolderSmallIcon from '@svg/folder/green-folder-small-icon.svg';
import OrangeFolderBigIcon from '@svg/folder/orange-folder-big-icon.svg';
import OrangeFolderSmallIcon from '@svg/folder/orange-folder-small-icon.svg';

export const colorDecoder = (color: string, size: string) => {
  if (size === 'big') {
    switch (color) {
      case 'BLUE':
        return <BlueFolderBigIcon />;
        break;
      case 'PINK':
        return <PinkFolderBigIcon />;
        break;
      case 'YELLOW':
        return <YellowFolderBigIcon />;
        break;
      case 'PURPLE':
        return <PurpleFolderBigIcon />;
        break;
      case 'GREEN':
        return <GreenFolderBigIcon />;
        break;
      case 'ORANGE':
        return <OrangeFolderBigIcon />;
        break;
    }
  }
  if (size === 'small') {
    switch (color) {
      case 'BLUE':
        return <BlueFolderSmallIcon />;
        break;
      case 'PINK':
        return <PinkFolderSmallIcon />;
        break;
      case 'YELLOW':
        return <YellowFolderSmallIcon />;
        break;
      case 'PURPLE':
        return <PurpleFolderSmallIcon />;
        break;
      case 'GREEN':
        return <GreenFolderSmallIcon />;
        break;
      case 'ORANGE':
        return <OrangeFolderSmallIcon />;
        break;
    }
  }
};