
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "../../hooks/useCreateCabin";
import { useEditCabin } from "../../hooks/useEditCabin";



function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId)
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editValues
  });

  const { errors } = formState

  const { createCabin, isCreating } = useCreateCabin();

  const { editCabin, isEditing } = useEditCabin()

  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if (isEditSession) editCabin({ newCabin: { ...data, image }, id: editId }, { onSuccess: () => { reset(); onCloseModal?.() } })
    else
      createCabin({ ...data, image: image }, {
        onSuccess: () => {
          reset();
          onCloseModal?.()
        }

      })

  }

  function onError(error) {
    console.log('nothing');
  }

  return (
    <Form type={onCloseModal ? 'modal' : 'regular'} onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input disabled={isWorking} type="text" id="name" {...register('name', {
          required: 'this field need to fill'
        })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register('maxCapacity', {
          required: 'need it'
        })} />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input disabled={isWorking} type="number" id="regularPrice" {...register('regularPrice', {
          required: 'fill these input first',
          min: {
            value: 1,
            message: 'the capacity need to be greater than 1'
          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input disabled={isWorking} type="number" id="discount" defaultValue={0} {...register('discount', {
          required: 'this field is required',
          validate: (value) => {
            value > getValues().regularPrice || "discount should be less than regular price"
          }
        })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea disabled={isWorking} type="number" id="description" defaultValue="" {...register('description', {
          required: 'this need'
        })} />
      </FormRow>

      <FormRow label="image" error={errors?.image?.message}>
        <FileInput disabled={isWorking} id="image" accept="image/*"  {...register('image', {
          required: isEditSession ? false : 'This field is required'
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isWorking} variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking} type="submit">{isEditSession ? 'Edit Cabin' : 'Create new Cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
