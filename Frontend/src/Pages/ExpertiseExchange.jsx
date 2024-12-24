// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Tabs, Tab, Button, Container, Card } from '@mui/material';
// import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
// // import { fetchSentRequests, fetchReceivedRequests } from '../features/exchange/exchangeSlice';

const ExpertiseExchange = () => {
//     const [activeTab, setActiveTab] = useState(0);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
    
//     // const { sentRequests, receivedRequests, loading } = useSelector(
//         // (state) => state.exchange
//     // );
// // 
//     // useEffect(() => {
//     //     dispatch(fetchSentRequests());
//     //     dispatch(fetchReceivedRequests());
//     // }, [dispatch]);

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//     };

//     const handleCreateExchange = () => {
//         navigate('/create-exchange');
//     };

//     return (
//         <Container maxWidth="lg" sx={{ py: 4 }}>
//             {/* Section 1: How Exchange Works */}
//             <Card sx={{ mb: 4, p: 3 }}>
//                 <div className="exchange-info">
//                     <div className="exchange-header" style={{ 
//                         display: 'flex', 
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         marginBottom: '20px'
//                     }}>
//                         <h1>Skill Exchange Platform</h1>
//                         <Button 
//                             variant="contained" 
//                             color="primary"
//                             startIcon={<SwapHorizIcon />}
//                             onClick={handleCreateExchange}
//                         >
//                             Create Exchange Proposal
//                         </Button>
//                     </div>

//                     <div className="exchange-steps" style={{ 
//                         display: 'grid',
//                         gridTemplateColumns: 'repeat(3, 1fr)',
//                         gap: '20px',
//                         marginTop: '20px'
//                     }}>
//                         <div className="step">
//                             <h3>1. Create Proposal</h3>
//                             <p>Define the skills you can offer and the skills you want to learn. 
//                                Specify your availability and preferred learning style.</p>
//                         </div>
//                         <div className="step">
//                             <h3>2. Match & Connect</h3>
//                             <p>Find users with complementary skills. Send and receive exchange 
//                                proposals to establish learning partnerships.</p>
//                         </div>
//                         <div className="step">
//                             <h3>3. Start Learning</h3>
//                             <p>Begin your skill exchange journey. Schedule sessions, track 
//                                progress, and provide feedback.</p>
//                         </div>
//                     </div>
//                 </div>
//             </Card>

//             {/* Section 2: Requests Tabs */}
//             <Card sx={{ mt: 4 }}>
//                 <Tabs 
//                     value={activeTab} 
//                     onChange={handleTabChange}
//                     sx={{ borderBottom: 1, borderColor: 'divider' }}
//                 >
//                     <Tab label="Received Requests" />
//                     <Tab label="Sent Requests" />
//                 </Tabs>

//                 {/* Received Requests Tab */}
//                 <TabPanel value={activeTab} index={0}>
//                     {loading ? (
//                         <div>Loading...</div>
//                     ) : receivedRequests?.length > 0 ? (
//                         <div className="requests-grid" style={{
//                             display: 'grid',
//                             gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//                             gap: '20px',
//                             padding: '20px'
//                         }}>
//                             {receivedRequests.map((request) => (
//                                 <RequestCard 
//                                     key={request._id}
//                                     request={request}
//                                     type="received"
//                                 />
//                             ))}
//                         </div>
//                     ) : (
//                         <div style={{ padding: '20px', textAlign: 'center' }}>
//                             No received requests yet
//                         </div>
//                     )}
//                 </TabPanel>

//                 {/* Sent Requests Tab */}
//                 <TabPanel value={activeTab} index={1}>
//                     {loading ? (
//                         <div>Loading...</div>
//                     ) : sentRequests?.length > 0 ? (
//                         <div className="requests-grid" style={{
//                             display: 'grid',
//                             gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//                             gap: '20px',
//                             padding: '20px'
//                         }}>
//                             {sentRequests.map((request) => (
//                                 <RequestCard 
//                                     key={request._id}
//                                     request={request}
//                                     type="sent"
//                                 />
//                             ))}
//                         </div>
//                     ) : (
//                         <div style={{ padding: '20px', textAlign: 'center' }}>
//                             No sent requests yet
//                         </div>
//                     )}
//                 </TabPanel>
//             </Card>
//         </Container>
//     );
// };

// // TabPanel component
// const TabPanel = ({ children, value, index }) => {
//     return (
//         <div role="tabpanel" hidden={value !== index}>
//             {value === index && children}
//         </div>
//     );
// };

// // RequestCard component
// const RequestCard = ({ request, type }) => {
//     const dispatch = useDispatch();

//     const handleAccept = () => {
//         dispatch(acceptExchangeRequest(request._id));
//     };

//     const handleReject = () => {
//         dispatch(rejectExchangeRequest(request._id));
//     };

//     return (
//         <Card sx={{ p: 2 }}>
//             <div style={{ marginBottom: '10px' }}>
//                 <h3>{type === 'received' ? 'From:' : 'To:'} {request.user.name}</h3>
//                 <p><strong>Skills Offered:</strong> {request.skillsOffered.join(', ')}</p>
//                 <p><strong>Skills Requested:</strong> {request.skillsRequested.join(', ')}</p>
//                 <p><strong>Status:</strong> {request.status}</p>
//             </div>
            
//             {type === 'received' && request.status === 'pending' && (
//                 <div style={{ display: 'flex', gap: '10px' }}>
//                     <Button 
//                         variant="contained" 
//                         color="primary" 
//                         size="small"
//                         onClick={handleAccept}
//                     >
//                         Accept
//                     </Button>
//                     <Button 
//                         variant="outlined" 
//                         color="error" 
//                         size="small"
//                         onClick={handleReject}
//                     >
//                         Reject
//                     </Button>
//                 </div>
//             )}
//         </Card>
//     );
};

export default ExpertiseExchange;