export interface Label {
	color: string;
	default: boolean;
	description?: string;
	id: number;
	name: string;
	node_id: string;
	url: string;
}
export interface IssuesResult {
	active_lock_reason: null;
	assignee: User | null;
	assignees: User[];
	author_association: AuthorAssociation;
	body: null | string;
	closed_at: null;
	comments: number;
	comments_url: string;
	created_at: Date;
	draft?: boolean;
	events_url: string;
	html_url: string;
	id: number;
	labels: Label[];
	labels_url: string;
	locked: boolean;
	milestone: null;
	node_id: string;
	number: number;
	performed_via_github_app: null;
	pull_request?: PullRequest;
	reactions: Reactions;
	repository_url: string;
	state: State;
	state_reason: null;
	timeline_url: string;
	title: string;
	updated_at: Date;
	url: string;
	user: User;
}

export interface User {
	avatar_url: string;
	events_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	gravatar_id: string;
	html_url: string;
	id: number;
	login: string;
	node_id: string;
	organizations_url: string;
	received_events_url: string;
	repos_url: string;
	site_admin: boolean;
	starred_url: string;
	subscriptions_url: string;
	type: Type;
	url: string;
}

export enum Type {
	User = "User",
}

export enum AuthorAssociation {
	Collaborator = "COLLABORATOR",
	Contributor = "CONTRIBUTOR",
	Member = "MEMBER",
	None = "NONE",
}

export enum Color {
	B60205 = "b60205",
	D4C5F9 = "d4c5f9",
	E7E7E7 = "e7e7e7",
	The8Ffcd6 = "8ffcd6",
	The9149D1 = "9149d1",
}

export enum Name {
	CLASigned = "CLA Signed",
	ComponentSuspense = "Component: Suspense",
	ReactCoreTeam = "React Core Team",
	StatusUnconfirmed = "Status: Unconfirmed",
	TypeBug = "Type: Bug",
}

export enum NodeID {
	MDU6TGFiZWw0MDkyOTE1MQ = "MDU6TGFiZWw0MDkyOTE1MQ==",
	MDU6TGFiZWwxMTA5NDA3NjQ1 = "MDU6TGFiZWwxMTA5NDA3NjQ1",
	MDU6TGFiZWwxNTU5ODQxNjA = "MDU6TGFiZWwxNTU5ODQxNjA=",
	MDU6TGFiZWwxNzc1OTU4Mjg1 = "MDU6TGFiZWwxNzc1OTU4Mjg1",
	MDU6TGFiZWwxOTY4NTgzNzQ = "MDU6TGFiZWwxOTY4NTgzNzQ=",
}

export interface PullRequest {
	diff_url: string;
	html_url: string;
	merged_at: null;
	patch_url: string;
	url: string;
}

export interface Reactions {
	"+1": number;
	"-1": number;
	confused: number;
	eyes: number;
	heart: number;
	hooray: number;
	laugh: number;
	rocket: number;
	total_count: number;
	url: string;
}

export enum State {
	Open = "open",
	Closed = "closed",
}
