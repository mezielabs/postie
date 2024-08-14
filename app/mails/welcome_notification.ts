import User from '#models/user'
import { BaseMail } from '@adonisjs/mail'

export default class WelcomeNotification extends BaseMail {
  from = 'support@example.com'
  subject = 'Welcome to Postie!'

  constructor(private user: User) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message.to(this.user.email).htmlView('emails/welcome_email', { user: this.user })
  }
}
