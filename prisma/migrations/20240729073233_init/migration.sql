-- CreateTable
CREATE TABLE `School` (
    `id` VARCHAR(191) NOT NULL,
    `schoolnames` VARCHAR(191) NOT NULL,
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedat` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Userchild` (
    `id` VARCHAR(191) NOT NULL,
    `names` VARCHAR(191) NOT NULL,
    `schoolid` VARCHAR(191) NOT NULL,
    `fatherid` VARCHAR(191) NOT NULL,
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedat` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Userchild` ADD CONSTRAINT `Userchild_schoolid_fkey` FOREIGN KEY (`schoolid`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Userchild` ADD CONSTRAINT `Userchild_fatherid_fkey` FOREIGN KEY (`fatherid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
