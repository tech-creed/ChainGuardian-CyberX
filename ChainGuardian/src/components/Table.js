import './tabels.css'

const Table = ({ data }) => {
  return (
    <>
      <hr />
      <h1>Transaction Inputs</h1>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                  <tr>
                        <th scope="col" classNameName="px-6 py-4">Id</th>
                        <th scope="col" classNameName=" px-6 py-4">Block Id</th>
                        <th scope="col" classNameName=" px-6 py-4">Date Time</th>
                        <th scope="col" classNameName=" px-6 py-4">USD</th>
                        <th scope="col" classNameName=" px-6 py-4">Sender Address</th>
                        <th scope="col" classNameName=" px-6 py-4">Transferred</th>
                      </tr>
                </thead>
                <tbody>
                {data && data.inputs.map(element => (
                        <tr classNameName="border-b dark:border-neutral-500">
                          <td classNameName="whitespace-nowrap text-white px-6 py-4 font-medium">{element.id}</td>
                          <td classNameName="whitespace-nowrap text-white px-6 py-4">{element.block_id}</td>
                          <td classNameName="whitespace-nowrap text-white px-6 py-4">{element.time}</td>
                          <td classNameName="whitespace-nowrap text-white px-6 py-4">{element.usd}</td>
                          <td classNameName="whitespace-nowrap text-white px-6 py-4">{element.recipient}</td>
                          <td classNameName="whitespace-nowrap text-white px-6 py-4">{element.transfered}</td>
                        </tr>
                      ))
                      }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h1>Transaction Output</h1>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead
                  className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                  <tr>
                        <th scope="col" classNameName=" px-6 py-4">Id</th>
                        <th scope="col" classNameName=" px-6 py-4">Block Id</th>
                        <th scope="col" classNameName=" px-6 py-4">Date Time</th>
                        <th scope="col" classNameName=" px-6 py-4">USD</th>
                        <th scope="col" classNameName=" px-6 py-4">Sender Address</th>
                        <th scope="col" classNameName=" px-6 py-4">Transferred</th>
                      </tr>
                </thead>
                <tbody>
                {data && data.outputs.map(element => (
                        <tr classNameName="border-b dark:border-neutral-500">
                          <td classNameName="whitespace-nowrap  px-6 py-4 font-medium">{element.id}</td>
                          <td classNameName="whitespace-nowrap  px-6 py-4">{element.block_id}</td>
                          <td classNameName="whitespace-nowrap  px-6 py-4">{element.time}</td>
                          <td classNameName="whitespace-nowrap  px-6 py-4">{element.usd}</td>
                          <td classNameName="whitespace-nowrap  px-6 py-4">{element.recipient}</td>
                          <td classNameName="whitespace-nowrap  px-6 py-4">{element.transfered}</td>
                        </tr>
                      ))
                      }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Table;