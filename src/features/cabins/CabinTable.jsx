import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "../../hooks/useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;


function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams, setSearchParams] = useSearchParams()

  const   filterValue = searchParams.get('discount') || 'all';

  //filter the cabin
  
  let filterCabins;

  if(filterValue === 'all') filterCabins = cabins;

  if(filterValue === 'no-discount') filterCabins = cabins?.filter(cabin => cabin.discount === 0);

  if(filterValue === 'discount') filterCabins = cabins?.filter(cabin => cabin.discount > 0)

  //sorted the cabin

  const sortedValue = searchParams.get('sortBy') || "startDate-asc";

  let sortedCabins;

  const [field,direction] = sortedValue.split('-');

  const modifier = direction === 'asc' ? 1 : -1;

  
  sortedCabins = filterCabins?.sort((a,b)=> (a[field] - b[field]) * modifier);



  if (isLoading) return <Spinner />;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
}

export default CabinTable;
