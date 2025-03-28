import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Main Booking Component
const BookingPage = () => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  // Fetch available shows
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('/api/shows', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, []);

  // Fetch seats when a show is selected
  useEffect(() => {
    const fetchSeats = async () => {
      if (selectedShow) {
        try {
          const response = await fetch(`/api/seats/theater/${selectedShow.theaterId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          setSeats(data);
        } catch (error) {
          console.error('Error fetching seats:', error);
        }
      }
    };

    fetchSeats();
  }, [selectedShow]);

  // Handle booking submission
  const handleBooking = async () => {
    if (!selectedShow || !selectedSeat) {
      alert('Please select a show and a seat');
      return;
    }

    try {
      // Create booking
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ShowId: selectedShow.showId,
          SeatId: selectedSeat.seatId
        })
      });

      if (!bookingResponse.ok) {
        throw new Error('Booking failed');
      }

      // Process payment
      const paymentResponse = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          BookingId: (await bookingResponse.json()).bookingId,
          Amount: selectedShow.ticketPrice
        })
      });

      if (!paymentResponse.ok) {
        throw new Error('Payment failed');
      }

      alert('Booking and payment successful!');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Book Your Show</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Show Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Show</label>
            <Select onValueChange={(value) => {
              const show = shows.find(s => s.showId === parseInt(value));
              setSelectedShow(show);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a show" />
              </SelectTrigger>
              <SelectContent>
                {shows.map(show => (
                  <SelectItem key={show.showId} value={show.showId.toString()}>
                    {show.title} - {new Date(show.showDateTime).toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Seat Selection */}
          {selectedShow && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Seat</label>
              <div className="grid grid-cols-5 gap-2">
                {seats.map(seat => (
                  <Button
                    key={seat.seatId}
                    variant={selectedSeat?.seatId === seat.seatId ? "default" : "outline"}
                    onClick={() => setSelectedSeat(seat)}
                  >
                    {seat.seatNumber}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Booking Summary and Payment */}
          {selectedShow && selectedSeat && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Proceed to Booking</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Booking Confirmation</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p><strong>Show:</strong> {selectedShow.title}</p>
                  <p><strong>Date:</strong> {new Date(selectedShow.showDateTime).toLocaleString()}</p>
                  <p><strong>Seat:</strong> {selectedSeat.seatNumber}</p>
                  <p><strong>Price:</strong> ${selectedShow.ticketPrice.toFixed(2)}</p>
                  <Button onClick={handleBooking} className="w-full">Confirm Booking</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;