import { connection } from "next/server";
import prisma from "@doppelnews/shared/lib/prisma";

export default async function AdminUsersPage() {
  await connection();

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      _count: {
        select: {
          articles: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="admin-panel">
      <div className="admin-section-title">
        <h2>Usuarios</h2>
      </div>

      <div className="admin-table" role="table" aria-label="Usuarios">
        <div role="row">
          <strong>Nome</strong>
          <strong>Email</strong>
          <strong>Noticias</strong>
        </div>
        {users.map((user) => (
          <div key={user.id} role="row">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user._count.articles}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
