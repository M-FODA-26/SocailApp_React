export async function showAlert(options) {
  const { default: Swal } = await import('sweetalert2')
  return Swal.fire(options)
}
