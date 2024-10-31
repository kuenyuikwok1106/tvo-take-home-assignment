'use client';
import { Typography } from "@mui/material";

export default function Error() {
    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-center">Something went wrong!</h2>
            <Typography>You are required to pass in the
                <b> name</b>,
                <b> lat</b> and
                <b> lon </b>
                of the city you are searching.
            </Typography>
            <Typography>Please try again.</Typography>
        </main>
    );
}