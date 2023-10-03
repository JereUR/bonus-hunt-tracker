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
    .order('created_at', { ascending: true })

  return { error, bonuses }
}

export const addBonusToSupabase = async (bonus) => {
  const { slotName, bet, win, odd, user_id } = bonus

  const { data: bonuses, error } = await supabase
    .from('bonuses')
    .insert([{ slotName, bet, win, odd, user_id }])
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
  const { data, error } = await supabase.from('bonuses').delete().eq('id', id)

  return { data, error }
}

export const deleteAllBonusFromUser = async (id) => {
  const { data, error } = await supabase
    .from('bonuses')
    .delete()
    .eq('user_id', id)

  return { data, error }
}

//Session

export const signUpWithEmail = async (credentials) => {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        name: credentials.name,
        user_name: credentials.user_name
      }
    }
  })

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
