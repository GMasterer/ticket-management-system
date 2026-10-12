<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->query('status');
        $priority = $request->query('priority');

        $tickets = $request->user()->tickets() // only the logged-in user's tickets
            ->when(in_array($status, Ticket::STATUSES, true), fn ($q) => $q->where('status', $status))
            ->when(in_array($priority, Ticket::PRIORITIES, true), fn ($q) => $q->where('priority', $priority))
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
            'filters' => $request->only('status', 'priority'),
            'options' => $this->options(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Tickets/Create', ['options' => $this->options()]);
    }

    public function store(StoreTicketRequest $request): RedirectResponse
    {
        // The relationship fills user_id with the logged-in user's id (same as auth()->id()).
        $request->user()->tickets()->create($request->validated());

        return redirect()->route('tickets.index')->with('success', 'Ticket created.');
    }

    public function show(Ticket $ticket): Response
    {
        Gate::authorize('view', $ticket); // 403 if not the owner

        return Inertia::render('Tickets/Show', ['ticket' => $ticket]);
    }

    public function edit(Ticket $ticket): Response
    {
        Gate::authorize('update', $ticket);

        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
            'options' => $this->options(),
        ]);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket): RedirectResponse
    {
        // Ownership was already checked in UpdateTicketRequest::authorize()
        $ticket->update($request->validated());

        return redirect()->route('tickets.show', $ticket)->with('success', 'Ticket updated.');
    }

    public function destroy(Ticket $ticket): RedirectResponse
    {
        Gate::authorize('delete', $ticket);

        $ticket->delete();

        return redirect()->route('tickets.index')->with('success', 'Ticket deleted.');
    }

    private function options(): array
    {
        return [
            'priorities' => Ticket::PRIORITIES,
            'statuses' => Ticket::STATUSES,
            'categories' => Ticket::CATEGORIES,
        ];
    }
}