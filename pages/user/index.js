import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";

import Admin from "@/components/layouts/Admin";
import Table from "@/components/Table/Table.component";
import Button from "@/components/Forms/Button.component";
import { useSession } from "next-auth/react";

const Index = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const session = useSession();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const user_id = session?.data?._id;

  useEffect(() => {
    const getUsers = async (user_id) => {
      const { data } = await axios.post(`/api/user`, { user_id });
      setUsers(data);
      setLoading(false);
    };

    user_id ? getUsers(user_id) : "";
  }, [user_id]);

  const onDeleteHandler = async (id) => {
    const confirmation = window.confirm(
      t("common:Are you sure want to delete ?")
    );

    if (confirmation) {
      const res = await axios.delete(`/api/user/edit/${id}`);
      console.log(res, '===')
      if (res.status === 200) {
        toast.success(t("common:Successfully done"));
        setTimeout(() => {
          window.location.reload()
        }, 3000);
      }
    }
  };

  const approvedHandler = async (id) => {
    const confirmation = window.confirm(
      t("common:Are you sure want to approve ?")
    );
    if (confirmation) {
      const res = await axios.post(`/api/user/approve`, { id });
      if (res.status === 200) {
        toast.success(t("common:Successfully done"));
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }
  };

  const columns = [
    {
      name: t("common:Username"),
      path: "username",
    },
    {
      name: t("common:Email"),
      path: "email",
    },
    {
      name: t("common:Role Name"),
      addContent: (data, index) => {
        return (
          <td key={`action-id-${index}`} className="border">
            {
               data.role_id.role =='superadmin' ? "Super Admin" : (data.role_id.role =='admin' ? 'Building Owner':'Tenant Member')
            }
          </td>
        );
      },
    },
    {
      name: t("common:Action"),
      addContent: (data) => {
        return (
          <td key={`action-id-${data._id}`} className="border">
            <Link href={`/user/edit/${data._id}`}>
              <Button
                type="button"
                className={`button bg-blue-500 text-white button-sm p-1 px-2 rounded-md`}
              >
                <i className="fa fa-pencil"></i>
              </Button>
            </Link>

            <Button
              event={() => onDeleteHandler(data._id)}
              type="button"
              className={`button text-white bg-red-500 font-bold mx-1 px-2 rounded button-sm p-1`}
            >
              <i className="fa fa-xmark"></i>
            </Button>

            {data.is_verified ? (
              <span className="text-green-500 font-bold">Verified</span>
            ) : (
              <Button
                event={() => approvedHandler(data._id)}
                type="button"
                className={`button text-white bg-green-500 font-bold mx-1 px-2 rounded button-sm p-1`}
              >
                <i className="fa fa-check"></i>
              </Button>
            )}
          </td>
        );
      },
    },
  ];

  return (
    <Admin>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1 className="text-center text-xl text-gray-800 font-bold my-2">
            {t("common:User")}
          </h1>
          <div className="flex justify-end mr-5">
            <Link href={`/user/create`}>
              <Button
                type="button"
                className={`button text-white bg-green-900 font-bold mx-1 px-2 rounded button-sm p-1`}
              >
                <i className="fa fa-add"></i>
              </Button>
            </Link>
          </div>
          <div style={{ overflow: "scroll" }}>
            <Table data={users} columns={columns}></Table>
          </div>
        </div>
      )}
    </Admin>
  );
};

// export async function getServerSideProps(context) {
//   const users = await User.find({}).populate({
//     path: "role_id",
//     model: "Role",
//   });
//   return {
//     props: {
//       users: JSON.parse(JSON.stringify(users)),
//     },
//   };
// }

export default Index;
