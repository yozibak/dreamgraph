import { PropsWithChildren } from 'react'

export const Container: React.FC<PropsWithChildren<{ roomID?: string }>> = ({
  children,
  roomID,
}) => {
  return (
    <div className="container">
      <Header roomID={roomID} />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export const Header: React.FC<{ roomID?: string }> = ({ roomID }) => <div>chat room {roomID}</div>

export const Footer: React.FC = () => <a href="https://github.com/yozibak/serverless-chat">📑 Github</a>
