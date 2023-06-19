import { TableOfTrash } from "./TableOfTrash";
export const Trash = () => {
  return (
    <>
      <main className="p-4 px-8  md:ml-64 h-auto pt-20 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mb-4">
          <h1 className="text-center text-[30px] font-bold">Trash</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mb-4">
          <TableOfTrash />
        </div>
      </main>
    </>
  );
};
