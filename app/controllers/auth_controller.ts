import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  create({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store({ request, auth, session, response }: HttpContext) {
    try {
      const user = await User.verifyCredentials(request.input('email'), request.input('password'))

      await auth.use('web').login(user)

      session.flash({
        notification: {
          type: 'success',
          message: 'Log in successful.',
        },
      })

      return response.redirect('/')
    } catch (error) {
      session.flash({
        notification: {
          type: 'error',
          message: 'Invalid credentials.',
        },
      })

      return response.redirect().back()
    }
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect('/')
  }
}
