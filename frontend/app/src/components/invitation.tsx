export const Invitation = ({ invitationLink }: { invitationLink: string }) => {
  return (
    <div
      onClick={() => copyToClipboard(invitationLink)}
      style={{ fontSize: '0.88rem', fontStyle: 'italic' }}
    >
      <span style={{ cursor: 'pointer' }}>🔗 INVITATION LINK: {invitationLink}</span>
    </div>
  )
}

const copyToClipboard = async (link: string) => {
  await navigator.clipboard.writeText(link)
  alert('copied the invitation link 😎')
}
