export const Invitation = ({ invitationLink }: { invitationLink: string }) => {
  const copyLink = async () => {
    await navigator.clipboard.writeText(invitationLink)
    alert('copied the invitation link 😎')
  }
  return (
    <div>
      <div>INVITATION LINK: {invitationLink}</div>
      <button onClick={copyLink}>copy</button>
    </div>
  )
}
