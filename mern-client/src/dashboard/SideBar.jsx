
import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloudUpload, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { useContext } from 'react';
import { Authcontext } from '../contects/AuthProvider'
import { Link } from 'react-router-dom';


const SideBar = () => {
   const {user} = useContext(Authcontext);
    return(
        <Sidebar aria-label="Sidebar with content separator example">
           <Sidebar.Logo href="" img={user?.photoURL} imgAlt="Flowbite logo" className='w-16 h-16'>
        <p>
          {
            user?.email ||"Demo User"
          }
        </p>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/admin/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/admin/dashboard/upload" icon={HiOutlineCloudUpload}>
            Upload Book
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/admin/dashboard/manage" icon={HiInbox}>
            Manage Books
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/login" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/logout" icon={HiTable}>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
              </Sidebar.Items>
    </Sidebar>
    )
}


export default SideBar