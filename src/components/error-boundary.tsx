import React from "react";

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends React.Component<
	React.PropsWithChildren,
	ErrorBoundaryState
> {
	override state: ErrorBoundaryState = { hasError: false };

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	override componentDidCatch(error: Error, info: React.ErrorInfo) {
		console.error("ErrorBoundary caught error", error, info);
	}

	override render() {
		if (this.state.hasError) {
			return (
				<div
					role="alert"
					className="bg-card/50 backdrop-blur-sm border-muted p-6 w-screen h-screen flex flex-col justify-center items-center text-center"
				>
					<h2 className="font-semibold mb-2">Something went wrong</h2>
					<p className="text-sm opacity-80">
						Try refreshing the page. If the problem persists, contact an event
						organizer.
					</p>
				</div>
			);
		}
		return this.props.children;
	}
}
