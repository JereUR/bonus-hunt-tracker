import { supabase } from './supabase'

//User Data

export const getUserFromSupabase = async () => {
  return await supabase.auth.getUser()
}

//Bonuses

export const getBonusesFromSupabase = async () => {
  const user = await getUserFromSupabase()

  if (user === null || user.data.user === null) return

  const { data: bonuses, error } = await supabase
    .from('bonuses')
    .select('*')
    .eq('user_id', user.data.user.id)
    .order('date', { ascending: true })

  return { error, bonuses }
}

export const addBonusToSupabase = async (data) => {
  const { data: bonuses, error } = await supabase
    .from('bonuses')
    .insert(data)
    .select()

  return { error, bonuses }
}

export const updateBonusItemFromSupabase = async (id, win, odd) => {
  const { data: bonuses, error } = await supabase
    .from('bonuses')
    .update({ win: win, odd: odd })
    .eq('id', id)
    .select()

  return { error, bonuses }
}

export const deleteBonusFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase.from('bonuses').delete().eq('id', id)

    return { data, error }
  } catch (error) {
    console.error('Error al eliminar el bonus:', error.message)
  }
}

//Session

export const updateUser = async (credentials, user) => {
  const { error: errorUpdate } = await supabase
    .from('users')
    .update({ name: credentials.name, user_name: credentials.user_name })
    .eq('id', user.user.id)
    .select()

  return { errorUpdate }
}

export const signUpWithEmail = async (credentials) => {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password
  })

  if (error === null) {
    const { errorUpdate } = await updateUser(credentials, data)

    return { data, error, errorUpdate }
  }

  return { data, error }
}

export const signInWithEmail = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  return { data, error }
}

export const signInWithGoogle = async () => {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })

  return { user, error }
}

export const signInWithGithub = async () => {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: 'github'
  })

  return { user, error }
}

export const signOutFromSupabase = () => {
  supabase.auth.signOut()
}
