import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostLikesController {
  async store({ params, auth, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    const user = auth.user!

    if (await user.hasLikedPost(post.id)) {
      return response.redirect().back()
    }

    await user.related('likes').attach([post.id])

    return response.redirect().back()
  }

  async destroy({ params, auth, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    const user = auth.user!

    await user.related('likes').detach([post.id])

    return response.redirect().back()
  }
}
