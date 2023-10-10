import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from './entities/member.entity';
import { BoardService } from 'src/board/board.service';
import { UserService } from 'src/user/user.service';
import { BoardMemberEntity } from 'src/board_member/entities/board_member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
    @InjectRepository(BoardMemberEntity)
    private readonly boardMemberRepository: Repository<BoardMemberEntity>,
    private readonly boardService: BoardService,
    private readonly userService: UserService,
  ) { }   
  
  // const adminId = await this.boardService.findOneByUuid(userId);

  async create(BoardId: string, userId: string, createMemberDto) {
    try {
      const user = await this.userService.findOrThrowError(userId);

      const board = await this.boardService.findOrThrowError(BoardId);

      const member = this.memberRepository.create({
        user,
      });

      const savedMember = await this.memberRepository.save(member);

      const boardMember = this.boardMemberRepository.create({
        user,
        board,
        email: createMemberDto,
      });

      const savedBoardMember = await this.boardMemberRepository.save(boardMember);
      return { savedBoardMember, savedMember };
    } catch (error) {
      throw error;
    }
  }

  

  async getAllMembersByBoardId(boardId: string): Promise<BoardMemberEntity[]> {
    return await this.boardMemberRepository.find({ where: { board: { id: boardId } } });
  }
  async findAll(): Promise<MemberEntity[]> {
    return await this.memberRepository.find();
  }
  
  async delete(memberId: string): Promise<void> {
    const deleteResult = await this.boardMemberRepository.delete(memberId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Member with ID ${memberId} not found`);
    }
  }







  // async findOne(id: string): Promise<MemberEntity | null> {
  //   const member = await this.memberRepository.findOne({where: {id}});
  //   if (!member) {
  //     return null;
  //   }
  //   return member;
  // }

  // async create(memberData: Partial<MemberEntity>): Promise<MemberEntity> {
  //   const newMember = this.memberRepository.create(memberData);
  //   return await this.memberRepository.save(newMember);
  // }

  // async update(id: string, memberData: Partial<MemberEntity>): Promise<MemberEntity | null> {
  //   const existingMember = await this.memberRepository.findOne({where: {id}});
  //   if (!existingMember) {
  //     return null;
  //   }
  //   this.memberRepository.merge(existingMember, memberData);
  //   return await this.memberRepository.save(existingMember);
  // }

  // async remove(id: string): Promise<void> {
  //   await this.memberRepository.delete(id);
  // }
}
