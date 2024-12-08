'use server'

const random = Math.random()

export async function test() {
  console.log(random)
  return random
}
