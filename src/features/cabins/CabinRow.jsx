import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "../../hooks/useDeleteCabin";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import { IoCopySharp, IoTrashBinSharp } from "react-icons/io5";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import { useCreateCabin } from "../../hooks/useCreateCabin";
import Menus from "../../ui/Menus";

function CabinRow({ cabin }) {
  const {
  
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    id: cabinId,
  } = cabin;

  const { isDeleting, removeCabin } = useDeleteCabin();

  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount}</Discount>
        <div>
          {/* <button disabled={isCreating} onClick={handleDuplicate}><IoCopySharp /></button> */}
          <Modal>
            <Menus>
              <Menus.Menu>
                <Menus.Toggle id={cabinId} />

                <Menus.List id={cabinId}>
                  <Menus.Button
                    icon={<IoCopySharp />}
                    onClick={handleDuplicate}
                  >
                    Duplicate
                  </Menus.Button>

                  <Modal.Open opens="edit">
                    <Menus.Button icon={<FaRegEdit />}>Edit</Menus.Button>
                  </Modal.Open>

                  <Modal.Open opens="delete">
                    <Menus.Button icon={<IoTrashBinSharp />}>
                      Delete
                    </Menus.Button>
                  </Modal.Open>
                </Menus.List>

                <Modal.Window name="edit">
                  <CreateCabinForm cabinToEdit={cabin} />
                </Modal.Window>

                <Modal.Window name="delete">
                  <ConfirmDelete
                    resourceName="cabins"
                    disabled={isDeleting}
                    onConfirm={() => removeCabin(cabinId)}
                  />
                </Modal.Window>
              </Menus.Menu>
            </Menus>
          </Modal>

          {/* <Modal>
            <Modal.Open opens='edit'>
              <button ><FaRegEdit /></button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="delete">
              <button><IoTrashBinSharp /></button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete disabled={isDeleting} onConfirm={()=>removeCabin(cabin_id)}/>
            </Modal.Window>
          </Modal> */}
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
