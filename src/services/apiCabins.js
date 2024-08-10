import supabase, { supabaseUrl } from "../supabase"




export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log('there is some error');
    throw new Error('there have some error')
  }

  return data
}

export async function createEditCabin(newCabin, id) {

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '')

  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // 1. Create cabin
  let query = supabase.from('cabins')

  if (!id)
    query = query.
      insert([{
        ...newCabin, image: imagePath
      }
      ]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id)

  const { error, data } = await query.select().single()

  if(hasImagePath) return data

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  if (storageError) {
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data[0].id);
  }

  if (error) {
    throw new Error(error.message)
  }

  return data

}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.log('there is some error');
    throw new Error(error.message)
  }

  return data
}