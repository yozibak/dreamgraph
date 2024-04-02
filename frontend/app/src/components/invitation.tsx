export const Invitation = ({ invitationLink }: { invitationLink: string }) => {
  const copyLink = async () => {
    await navigator.clipboard.writeText(invitationLink)
    alert('copied the invitation link 😎')
  }
  return (
    <div onClick={copyLink} style={{fontSize: '0.88rem', fontStyle: 'italic'}}>
      <span style={{cursor: 'pointer'}}>🔗 INVITATION LINK: {invitationLink}</span>
    </div>
  )
}
