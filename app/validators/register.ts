import vine from '@vinejs/vine'

export const RegisterValidator = vine.compile(
  vine.object({
    name: vine.string(),
    username: vine.string().unique(async (db, value) => {
      const result = await db.from('users').select('username').where('username', value).first()

      return result ? false : true
    }),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const result = await db.from('users').select('username').where('username', value).first()

        return result ? false : true
      }),
    password: vine.string().confirmed(),
  })
)
