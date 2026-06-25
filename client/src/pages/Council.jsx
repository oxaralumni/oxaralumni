import React, { useState, useEffect } from 'react'
import { User } from 'lucide-react'
import { supabase } from '../supabaseClient'

const INITIAL_COUNCIL = [
  { name: 'Fr. Packiam M., SJ', designation: 'Director', serial_number: 1 },
  { name: 'Ankit Khatri', designation: 'President', serial_number: 2 },
  { name: 'Srijan Girotra', designation: 'Vice President', serial_number: 3 },
  { name: 'Lavanya Rana', designation: 'Secretary', serial_number: 4 },
  { name: 'Aarav Rawat', designation: 'Treasurer', serial_number: 5 },
  { name: 'Manan Kaushik', designation: 'Manager', serial_number: 6 },
  { name: 'Harshit Gulati', designation: 'Sports Manager', serial_number: 7 },
  { name: 'Priyansh Charan Sinha', designation: 'Executive Member', serial_number: 8 },
  { name: 'Aarushi', designation: 'Executive Member', serial_number: 9 },
  { name: 'Gunn Narula', designation: 'Executive Member', serial_number: 10 },
  { name: 'Madhav Dhameja', designation: 'Executive Member', serial_number: 11 },
  { name: 'Divyam Nagar', designation: 'Executive Member', serial_number: 12 },
  { name: 'Aditya Massey', designation: 'Executive Member', serial_number: 13 },
]

export default function Council() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('council_members')
      .select('*')
      .order('serial_number', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setMembers(data)
        } else {
          setMembers(INITIAL_COUNCIL)
        }
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-heading font-extrabold text-4xl text-primary tracking-tight mb-2">Council</h1>
        <p className="font-heading font-semibold text-lg text-secondary">
          Alumni Association Governing Body Members
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <div
              key={member.id || index}
              className="bg-white border border-[#E0E0E0] rounded-lg p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border border-gray-200 mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4 border border-gray-200">
                  <User className="h-10 w-10 text-gray-400" />
                </div>
              )}
              <h3 className="font-heading font-bold text-base text-primary mb-1">{member.name}</h3>
              <p className="font-body text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                {member.designation}
              </p>
              {member.batch && (
                <p className="font-body text-xs text-gray-500">
                  Batch: {member.batch}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
