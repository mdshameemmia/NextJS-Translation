import React, { useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import { useSession } from "next-auth/react";

import Admin from "@/components/layouts/Admin";
import Table from "@/components/Table/Table.component";
import Link from "next/link";
import Button from "@/components/Forms/Button.component";
import UserRole from "@/helpers/UserRole";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Confirmation from "@/helpers/Confirmation";
import Swal from "sweetalert2";

const Index = () => {
  const { t } = useTranslation();
  const session = useSession();
  const router = useRouter();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState();

  const admin_id = session?.data?._id;

  useEffect(() => {
    const getMembers = async (admin_id) => {
      const { data } = await axios.get(
        `/api/members/getUserByMember/${admin_id}`
      );

      setMembers(data);
      setLoading(false);

      const user_role = await UserRole(admin_id);
      setRole(user_role);

      // alert functionality
      if (user_role == "user") {
        const getMember = async (admin_id) => {
          const { data } = await axios.post(`/api/direction/`, {
            id: admin_id,
          });

          if (data) {
            Confirmation(
              Swal,
              data.url,
              router,
              data.short_message,
              data.long_message,
              { id: admin_id }
            );
          }
        };

        admin_id ? getMember(admin_id) : "";
      }
    };
    admin_id ? getMembers(admin_id) : "";
  }, [admin_id]);

  const memberDelete = async (id) => {
    const confirmation = window.confirm(
      t("common:Are you sure want to delete ?")
    );
    if (confirmation) {
      const res = await axios.post(`/api/members/delete/45645`, { id });

      if (res.status === 200) {
        toast.success(t("common:Successfully done"));
        setTimeout(() => {
          router.push("/members");
        }, 3000);
      }
    }
  };

  return (
    <Admin>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1 className="text-center text-xl text-gray-800 font-bold my-2">
            {t("common:Member List")}
          </h1>
          <div className="flex justify-end mr-5">
            <Link href={`/members/create`}>
              <Button
                type="button"
                className={`button text-white bg-green-900 font-bold mx-1 px-2 rounded button-sm p-1`}
              >
                <i className="fa fa-add"></i>
              </Button>
            </Link>
          </div>
          <div style={{ overflow: "scroll" }}>
            <Table
              data={members ?? ""}
              columns={[
                {
                  name: t("common:Full Name"),
                  addContent: (data, index) => {
                    return (
                      <td key={`add-content-${index}`}>
                        {data.first_name} {data.last_name}
                      </td>
                    );
                  },
                },
                {
                  name: t("common:Mobile"),
                  path: "mobile",
                },
                {
                  name: t("common:Email"),
                  path: "email",
                },
                {
                  name: t("common:NID"),
                  path: "nid",
                },
                {
                  name: t("common:Father Name"),
                  path: "father_name",
                },
                {
                  name: t("common:Action"),
                  addContent: (data, index) => {
                    return (
                      <td key={`action-id-${index}`}>
                        {role == "admin" || role == "superadmin" ? (
                          <Link href={`/members/edit/${data._id}`}>
                            <Button
                              type="button"
                              className={`button bg-blue-500 text-white button-sm p-1 px-2 rounded-md`}
                            >
                              <i className="fa fa-pencil"></i>
                            </Button>
                          </Link>
                        ) : (
                          ""
                        )}
                        {role == "admin" || role == "superadmin" ? (
                          <Button
                            type="button"
                            className={`button text-white bg-red-500 font-bold mx-1 px-2 rounded button-sm p-1`}
                            event={() => memberDelete(data._id)}
                          >
                            <i className="fa fa-xmark"></i>
                          </Button>
                        ) : (
                          ""
                        )}
                        <Link href={`/members/assign-flat/${data.user_id}`}>
                          <Button
                            type="button"
                            className={`button text-white bg-green-500 font-bold mx-1 px-2 rounded button-sm p-1`}
                          >
                            <i className="fa fa-bars"></i>
                          </Button>
                        </Link>
                      </td>
                    );
                  },
                },
              ]}
            />
          </div>
        </div>
      )}
    </Admin>
  );
};

// export async function getServerSideProps(context) {
//   const members = await Member.find({});

//   return {
//     props: {
//       members: JSON.parse(JSON.stringify(members)),
//     },
//   };
// }

export default Index;
