import axios from 'axios'; // Import Axios or your preferred HTTP library
import { AssignmentDataObject } from '../domain/models/assignmentInterfaces'; // Import your assignment model

const API_URL = '/api/assignment'; // Adjust this URL according to your backend's URL structure

export const createAssignment = async (assignmentData: AssignmentDataObject): Promise<void> => {
  // Send a POST request to create a new assignment
  await axios.post(API_URL, assignmentData);
};

export const fetchAssignments = async (): Promise<AssignmentDataObject[]> => {
  // Send a GET request to fetch assignments
  const response = await axios.get(API_URL);

  // Check if the response status is successful (e.g., 200 OK)
  if (response.status === 200) {
    // Return the assignments data from the response
    return response.data;
  } else {
    // Handle other response status codes or errors here if needed
    throw new Error('Failed to fetch assignments');
  }
};

export const updateAssignment = async (assignmentData: AssignmentDataObject): Promise<void> => {
  // Send a PUT request to update an assignment
  await axios.put(`${API_URL}/${assignmentData.id}`, assignmentData);
};

export const deleteAssignment = async (assignmentId: number): Promise<void> => {
  // Send a DELETE request to delete an assignment
  await axios.delete(`${API_URL}/${assignmentId}`);
};
