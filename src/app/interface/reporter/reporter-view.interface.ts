export interface IReporterView {
    _id?: string;
    isVolunteer?: string;
    fname?: string;
    lname?: string;
    gender?: string;
    streetName?: string;
    postalCode?: string;
    city?: string;
    email?: string;
    phoneNumber?: string;
    status1?: string;
    status2?: string;
    dateRegistrationReporter?: Date;
    dateCreationTeam?: string;
    hostName?: string;
    activeTeamId?: string;
    activeTeamName?: string;
    activeTeamEmail?: string;
    chatName?: string;
    hostId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    _activeTeam?: string;
    _activeTeamName?: string;
    pendingTeam?: string;
    pendingTeamName?: string;
}