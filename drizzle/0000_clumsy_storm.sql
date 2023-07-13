CREATE TABLE `members` (
	`id` varchar(36) PRIMARY KEY NOT NULL,
	`uniId` varchar(20),
	`clerkId` varchar(50),
	`name` varchar(255) NOT NULL,
	`email` varchar(450) NOT NULL,
	`paid` boolean DEFAULT false,
	`receiptCode` varchar(4),
	`role` enum('member','committee','executive') NOT NULL DEFAULT 'member',
	`isUniMember` boolean);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `members` (`email`);