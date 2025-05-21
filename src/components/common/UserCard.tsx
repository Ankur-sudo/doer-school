// import { Avatar, Button, Divider } from "antd";
// import { UserOutlined } from "@ant-design/icons";
// import React, { Dispatch, SetStateAction } from "react";
// import { useAuth } from "@/contexts/AuthContext";
// import { Link } from "@/MUST_USE_IT_navigation";
// import { ILoginResponse } from "@/app/[locale]/(pages)/temp/login/lib/types/loginTypes";

// type Props = { setIsProfile: Dispatch<SetStateAction<boolean>> };

// export default function UserCard({ setIsProfile }: Props) {
//   const { logout, user } = useAuth();
//   return (
//     <div className="min-w-[250px] flex flex-col justify-center gap-1 pb-2 pt-2 items-center ">
//       <Avatar
//         style={{
//           backgroundColor: "var(--heading)",
//           width: "80px",
//           height: "80px",
//         }}
//         icon={
//           user?.data.fullName ? (
//             <span className="text-xl font-bold">
//               {user.data.fullName[0].toLocaleUpperCase()}
//             </span>
//           ) : (
//             <UserOutlined className="text-3xl" />
//           )
//         }
//       />
//       <h2>{user?.data?.fullName}</h2>
//       <h2>{user?.data?.email}</h2>

//       <Divider style={{ marginBottom: "10px" }} />
//       <Item link="/profile" title="Profile" setIsProfile={setIsProfile} />
//       <Item
//         link="/profile/availed-policy"
//         title="Availed Policy"
//         setIsProfile={setIsProfile}
//       />
//       {/* <Item link='/' title='Change Password' /> */}

//       <Divider style={{ marginTop: "10px" }} />
//       <div className="w-full flex justify-end">
//         <Button
//           onClick={() => {
//             logout();
//             setIsProfile(false);
//           }}
//           type="dashed"
//         >
//           Logout
//         </Button>
//       </div>
//     </div>
//   );
// }

// const Item = ({
//   link,
//   title,
//   setIsProfile,
// }: {
//   title: string;
//   link: string;
//   setIsProfile: any;
// }) => {
//   return (
//     <Link
//       className="bg-gray-200/20 w-full p-2 hover:bg-gray-200/40 rounded-md"
//       href={link}
//       onClick={() => {
//         setIsProfile(false);
//       }}
//     >
//       {title}
//     </Link>
//   );
// };
