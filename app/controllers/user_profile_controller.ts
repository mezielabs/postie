import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserProfileController {
  async index({ params, view }: HttpContext) {
    const user = await User.query()
      .where('username', params.username)
      .preload('posts', (query) => {
        query.preload('user').withCount('likes')
      })
      .withCount('posts')
      .withCount('likes')
      .firstOrFail()

    return view.render('pages/profile', { user })
  }
}
