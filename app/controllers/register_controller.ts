import User from '#models/user'
import { RegisterValidator } from '#validators/register'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  create({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async store({ request, auth, session, response }: HttpContext) {
    const payload = await request.validateUsing(RegisterValidator)

    const user = await User.create(payload)

    await auth.use('web').login(user)

    session.flash({
      notification: {
        type: 'success',
        message: 'Registration successful.',
      },
    })

    return response.redirect('/')
  }
}
