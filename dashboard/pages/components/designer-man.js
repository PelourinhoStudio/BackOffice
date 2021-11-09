import React, { useEffect, useState } from "react"
import api from '../../services/api'
import Image from "next/dist/client/image";
import moment from "moment";
import "moment/locale/pt";

export default function DesignerMan() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        api
            .get("/users")
            .then((response) => setUsers(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);


    return (
        <>

            <div className="text-center m-3 rounded-main bg-white">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Ultima vez Online</th>
                            <th>Estatuto</th>
                            <th>Estado</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            users.map((user) => {

                                return (
                                    <tr key={user.email}>
                                        <td><a href="#"><img src={user.avatar} className="avatar" alt="Avatar" /></a></td>
                                        <td>
                                            {'Online ' + moment(moment(user.lastOnline).format('DD-MM-YYYY'), "DDMMYYYY").fromNow()}
                                        </td>
                                        <td>
                                            {String(user.userType).toUpperCase()}
                                        </td>
                                        <td>
                                            {
                                                String(user.state).toUpperCase() == 'ATIVO' ? <><span className="status text-success">•</span> Ativo</> : <></>
                                            }
                                            {
                                                String(user.state).toUpperCase() == 'INATIVO' ? <><span className="status text-danger">•</span> Inativo</> : <></>
                                            }
                                            {
                                                String(user.state).toUpperCase() == 'SUSPENSO' ? <><span className="status text-warning">•</span> Suspenso</> : <></>
                                            }
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <a href="#" className="settings mr-2" title="" data-toggle="tooltip" data-original-title="settings mr-2"><i className="fas fa-cog text-danger"></i></a>
                                            <a href="#" className="delete" title="" data-toggle="tooltip" data-original-title="Delete"><i className="fas fa-times-circle text-primary"></i></a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>

    );
}
