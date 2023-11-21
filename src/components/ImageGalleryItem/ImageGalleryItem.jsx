import { ModalContainer } from 'components/Modal/Modal';
import { Component } from 'react';
import { Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = { isModalOpen: false };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  // openModal = () => {
  //   this.setState({ isModalOpen: true });
  // };
  // closeModal = () => {
  //   this.setState({ isModalOpen: false });
  // };

  render() {
    const { smallImg, largeImg } = this.props;
    return (
      <div>
        <Image src={smallImg} alt="pic" onClick={this.toggleModal} />
        <ModalContainer
          url={largeImg}
          isModalOpen={this.state.isModalOpen}
          closeModal={this.toggleModal}
        />
      </div>
    );
  }
}
