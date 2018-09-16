class ModalHelper {
  static toggleModal(id){
    $(id).toggleClass('show-modal')
  }

  static closeModals() {
    $('.modal').removeClass('show-modal')
  }
}