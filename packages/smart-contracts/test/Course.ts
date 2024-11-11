import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { assert, expect } from "chai";
import { createTestClient, http } from 'viem';
import hre, { viem } from "hardhat";
import { hardhat } from 'viem/chains';
import { privateKeyToAccount } from "viem/accounts";

describe("CourseManagementContract", () => {

    async function deployCourseManagementContractFixture() {
        const courseContract = await hre.viem.deployContract("CourseContract");
        const client = createTestClient({
            account: privateKeyToAccount('0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'),
            chain: hardhat,
            mode: "hardhat",
            transport: http(),
        })
        return { courseContract, client };
    }
    
    describe("Deployment", () => {

        it('should register a new student', async () => {
            // Arrange
            const { courseContract, client } = await loadFixture(deployCourseManagementContractFixture);
            // // Act
            await courseContract.write.registerUser([client.account.address, 0]);
            // // Assert
            const newUser = await courseContract.read.users([client.account.address]) as any[];
            expect(newUser).to.be.ok;
            expect(newUser[0]).to.equal(client.account.address);
            expect(newUser[2]).to.be.true;
        });
        

        it("should create a new course", async () => {
            // Arrange
            const { courseContract } = await loadFixture(deployCourseManagementContractFixture);
            // Act
            await courseContract.write.createCourse(["Integral Calculus", "Study the principles of integral calculus", 3]);
            // Assert
            const course = await courseContract.read.getCourse([0]) as any[];
            console.log(course);
            assert.ok(course);
            assert.equal(course[0], "Integral Calculus");
            assert.equal(course[1], "Study the principles of integral calculus");
            assert.equal(course[2], 3);
        
        });
        
        // it("should get a course by id", async () => {
        //     // Arrange
        //     const { courseManagementContract } = await loadFixture(deployCourseManagementContractFixture);
        //     await courseManagementContract.createCourse("Integral Calculus", "Study the principles of integral calculus", 3);
        //     // Act
        //     const result = await courseManagementContract.getCourse(1);
        //     // Assert
        //     expect(result[0]).to.equal("Integral Calculus");
        //     expect(result[1]).to.equal("Study the principles of integral calculus");
        //     expect(result[2]).to.equal(3);
        //     expect(result[3]).to.be.true;
        // });

        // it("should update a course by id", async () => {
        //     // Arrange
        //     const { courseManagementContract } = await loadFixture(deployCourseManagementContractFixture);
        //     await courseManagementContract.createCourse("Integral Calculus", "Study the principles of integral calculus", 3);
        //     // Act
        //     const result = await courseManagementContract.updateCourse(1, "Fundamentals of Integral Calculus", "Study the principles of integral calculus", 3);
        //     // Assert
        //     expect(result).to.be.ok;
        // });

        // it("should list created courses", async () => {
        //     // Arrange
        //     const { courseManagementContract } = await loadFixture(deployCourseManagementContractFixture);
        //     await courseManagementContract.createCourse("Differential Calculus", "Study the principles of differential calculus", 3);
        //     await courseManagementContract.createCourse("Vector Calculus", "Study the principles of vector calculus", 3);
        //     await courseManagementContract.createCourse("Advanced Calculus", "Study the principles of advanced calculus", 3);
        //     // Act
        //     const result = await courseManagementContract.listCourses();
        //     // Assert
        //     expect(result).to.be.an("array").that.has.lengthOf(4);
        //     expect(result[0]).to.equal(0);
        //     expect(result[1]).to.equal(1);
        //     expect(result[2]).to.equal(2);
        // });

        // it("should delete a course by id", async () => {
        //     // Arrange
        //     const { courseManagementContract } = await loadFixture(deployCourseManagementContractFixture);
        //     await courseManagementContract.createCourse("Differential Calculus", "Study the principles of differential calculus", 3);
        //     // Act
        //     const result = await courseManagementContract.deleteCourse(1);
        //     const course = await courseManagementContract.getCourse(1);
        //     // Assert
        //     expect(course[3]).to.be.false;
        // });

        // it("should add a schedule to a course by id", async () => {
        //     // Arrange
        //     const { courseManagementContract } = await loadFixture(deployCourseManagementContractFixture);
        //     await courseManagementContract.createCourse("Differential Calculus", "Study the principles of differential calculus", 3);
        //     // Act
        //     await courseManagementContract.addSchedule(1, 1, 8, 10);
        //     const course = await courseManagementContract.getCourse(1);
        //     expect(course[4]).to.equal(1);
        //     // Assert
        // });

        // it("should get a schedule by course id and schedule id", async () => {
        //     // Arrange
        //     const { courseManagementContract } = await loadFixture(deployCourseManagementContractFixture);
        //     await courseManagementContract.createCourse("Differential Calculus", "Study the principles of differential calculus", 3);
        //     await courseManagementContract.addSchedule(1, 1, 8, 10);
        //     const course = await courseManagementContract.getCourse(1);
        //     // Act
        //     const result = await courseManagementContract.getSchedule(1, 1);
        //     // Assert
        //     expect(result[0]).to.equal(1);
        //     expect(result[1]).to.equal(8);
        //     expect(result[2]).to.equal(10);
        // });

        // it("should register a student to a course", async () => {
        //     // Arrange
        //     const { courseManagementContract } = await loadFixture(deployCourseManagementContractFixture);
        //     const [address1, address2, address3] = await ethers.getSigners();
        //     await courseManagementContract.createCourse("Differential Calculus", "Study the principles of differential calculus", 3);
        //     await courseManagementContract.registerUser(address2.address, 0);
        //     // Act
        //     const result = await courseManagementContract.connect(address2).registerStudentInCourse(1);
        //     const assignedCourses = await courseManagementContract.connect(address2).getStudentCourses();
        //     // Assert
        //     expect(assignedCourses[0]).to.equal(1);
        // });

    });
});