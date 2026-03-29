import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllClaimsAPI } from '../claims/claimsAPI';
import { Navigate } from 'react-router-dom';
import { updateClaimStatusAPI } from '../claims/claimsAPI';


function Claims() {
  const [claims , setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

  const fetchClaims = async()=>{
    try {
      setLoading(true);
      const data = await getAllClaimsAPI();
      setClaims(data.claims);
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchClaims();
  },[])
  console.log(claims)
  const { userData, isLoggedin } = useSelector(state=>state.auth);
  if(userData?.role==="STUDENT") return <Navigate to='/home' replace/>
  if(!isLoggedin) return <Navigate to='/' replace/>

  const handleApprove = async(claimId) => {
    setLoadingId(claimId);
    try {
      await updateClaimStatusAPI(claimId, "APPROVED");
      setClaims((prev) => prev.map(c => c.claim_id === claimId ? { ...c, status: 'APPROVED' } : c));
    } catch (error) {
      console.log(error)
    }finally{
      setLoadingId(null);
    }
  }
  const handleReject = async(claimId) => {
    setLoadingId(claimId);
    try {
      await updateClaimStatusAPI(claimId, "REJECTED");
      setClaims((prev) => prev.map(c => c.claim_id === claimId ? { ...c, status: 'REJECTED' } : c));
    } catch (error) {
      console.log(error)
    }finally{
      setLoadingId(null);
    }
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <header className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Manage Claim Requests</h1>
      </header>
      {
        loading ? <p>Loading...</p> : (
          claims.length===0 ? <p>No Claims Found</p> :
          <div
          className="max-w-7xl mx-auto px-4 py-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {claims.map((claim)=>(
              <div key={claim.claim_id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* image */}
                  <div className="relative">
                    <img
                      src={`http://localhost:5000/uploads/${claim.image}`}
                      alt={claim.item_title}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                      {claim.status}
                    </span>
                  </div>

                  {/* content */}
                  <div
                    className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                          {claim.item_title}
                        </h3>
                        <p
                          className="text-sm text-gray-500 mt-1 line-clamp-2">Claimed By: {claim.user_name}
                        </p>
                        <p
                          className="text-sm text-gray-500 mt-1 line-clamp-2">Message : {claim.message}
                        </p>
                        <p
                          className="text-sm text-gray-500 mt-1 line-clamp-2">title : {claim.item_title}
                        </p>
                        <p
                          className="text-sm text-gray-500 mt-1 line-clamp-2">At : {claim.created_at}
                        </p>
                    </div>
                    
                    {/*actions */}
                    <div className="mt-4 flex flex-col gap-2">
                    
                      {claim.claim_status === "PENDING" && (
                      <>
                        <button className="w-full bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] transition text-white text-sm py-2 rounded-lg font-medium"
                        onClick={()=> handleApprove(claim.claim_id)}
                        disabled={loadingId === claim.claim_id}
                        >
                        {loadingId === claim.claim_id ? "Approving..." : "Approve Claim"}
                      </button>
                      <button className="w-full bg-yellow-500 hover:bg-yellow-600 active:scale-[0.98] transition text-white text-sm py-2 rounded-lg font-medium"
                        onClick={()=> handleReject(claim.claim_id)}
                        disabled={loadingId === claim.claim_id}
                        >
                        {loadingId === claim.claim_id ? "Rejecting..." : "Reject Claim"}
                      </button>
                    </>
                    )}
                    </div>
                  </div>
                </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default Claims;
