import React from 'react';
import { render, screen, waitFor } from "@testing-library/react"
import AnimalForm from './AnimalForm';
import userEvent from '@testing-library/user-event'

test('renders without errors', ()=> {
   render(<AnimalForm />);
})

test('when user fills all fields and submits, species appear in list', async () => {
   //arrange:
   render(<AnimalForm />);
   const species = 'feline';

   //act:
   const speciesInput = screen.getByLabelText(/species:/i);
   userEvent.type(speciesInput, species);

   const ageInput = screen.getByLabelText(/age:/i);
   userEvent.type(ageInput, '9');

   const notesInput = screen.getByLabelText(/notes:/i);
   userEvent.type(notesInput, 'whatever i want');

   const submitButton = screen.getByRole('button');
   userEvent.click(submitButton);

   //assert:
   await waitFor(() => {
      const speciesFeedback = screen.queryByText(/species/i);
      expect(speciesFeedback).toBeInTheDocument();
   }, {timeout: 4000})
})