import React, { useState } from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateCabinForm from './CreateCabinForm'
import CabinTable from './CabinTable'

function AddCabin() {
  return (
    <div>

      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
      {/* <Modal.Open opens="cabin-table">
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name="cabin-table">
        <CabinTable/>
      </Modal.Window> */}
    </div>

  )
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false)

//   return (
//     <>
//     <Button onClick={() => setIsOpenModal(!isOpenModal)}>Add New Cabin</Button>
//       { isOpenModal && 
//       <Modal onClose={()=>setIsOpenModal(false)}>
//         <CreateCabinForm onCloseModal={()=>setIsOpenModal(false)}/>
//       </Modal> }
//     </>
//   )
// }

export default AddCabin