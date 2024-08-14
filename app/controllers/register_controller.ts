import User from '#models/user'
import { RegisterValidator } from '#validators/register'
import type { HttpContext } from '@adonisjs/core/http'
import Queue from '@rlanz/bull-queue/services/main'
import SendWelcomeEmailJob from '../jobs/send_welcome_email_job.js'

export default class RegisterController {
  create({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async store({ request, auth, session, response }: HttpContext) {
    const payload = await request.validateUsing(RegisterValidator)

    const user = await User.create(payload)

    await auth.use('web').login(user)

    Queue.dispatch(SendWelcomeEmailJob, user)

    session.flash({
      notification: {
        type: 'success',
        message: 'Registration successful.',
      },
    })

    return response.redirect('/')
  }
}
