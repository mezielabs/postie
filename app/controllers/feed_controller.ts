import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class FeedController {
  async index({ view }: HttpContext) {
    const posts = await Post.query()
      .orderBy('created_at', 'desc')
      .preload('user')
      .withCount('likes')

    return view.render('pages/home', { posts })
  }
}
