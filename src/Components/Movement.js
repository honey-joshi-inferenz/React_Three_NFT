let movement = {}

export function isPressed(keyCode) {
  return movement[keyCode] ? movement[keyCode] : false
}

export function down(e) {
  if (movement[e.keyCode]) return
  movement[e.keyCode] = true
  console.log('keyDown:', e.key, 'keyCode:', e.keyCode)
}
export function up(e) {
  movement[e.keyCode] = false
  console.log('keyUp:', e.key, 'keyCode:', e.keyCode)
}
