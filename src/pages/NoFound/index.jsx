import './index.less'
import { useNavigate} from 'react-router-dom'
const NoFound = () => {
  const navigate=useNavigate()
  const backHome=()=>{
    navigate('/home')
  }
  return (
    <>
      <div className="no-found">
        <div className="nofound-content">
        <h1>未找到页面!</h1>
        <div>
          <span>4</span>
          <span className="circle">0</span>
          <span>4</span>
        </div>
        <p>We are unable to find the page.<br/>无法找到页面！请重新访问页面</p>
        <div>
          <button onClick={backHome}>返回首页</button>
        </div>
        </div>
      </div>
    </>
  )
}
export default NoFound