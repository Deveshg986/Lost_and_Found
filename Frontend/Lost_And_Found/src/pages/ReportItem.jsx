import React from 'react'

export default function ReportItem() {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Report Found Item
        </h2>

        <form className="space-y-5">

          <div>
            <label 
              htmlFor="item-name" 
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Item Name
            </label>

            <input
              type="text"
              id="item-name"
              name="item-name"
              placeholder="Enter item name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label 
              htmlFor="item-desc" 
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Description
            </label>

            <textarea
              id="item-desc"
              name="item-desc"
              rows={4}
              placeholder="Enter item description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="item-loc"
            className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Location
            </label>
            <input type="text" 
              placeholder='Enter Item Location'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label htmlFor="item-pic" className="block text-sm font-semibold text-gray-700 mb-1">Image of Item</label>
            <input type="file" name="item-pic" id="item-pic"  
             className="
          w-full text-sm text-gray-700
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-600 file:text-white
          hover:file:bg-blue-700
          border border-gray-300
          rounded-lg cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-blue-500
          " />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
