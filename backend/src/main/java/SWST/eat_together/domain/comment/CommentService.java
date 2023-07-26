package SWST.eat_together.domain.comment;

import SWST.eat_together.domain.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");
    Date date = new Date(System.currentTimeMillis());


    public int addComment(Member member, CommentDTO regiComment, Long postId) {
        Comment comment = new Comment();

        comment.setPostId(postId);
        comment.setContents(regiComment.getContents());
        comment.setNickname(member.getNickname());
        comment.setCreatedDate(formatter.format(date));
        comment.setEmail(member.getEmail());

        try {
            commentRepository.save(comment);
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("comment = " + comment);
        return 1;
    }

    public Integer deleteComment(Long commentId, String email) {
        Comment comment = commentRepository.getReferenceById(commentId);

        if(!email.equals(comment.getEmail()))
            return -1;
        commentRepository.delete(comment);

        return 0;
    }

    public Integer editComment(Long commentId, String email, String contents) {
        Comment comment = commentRepository.getReferenceById(commentId);

        if (!email.equals(comment.getEmail()))
            return -1;
        comment.setContents(contents);
        commentRepository.save(comment);
        return 0;
    }

    public List<CommentDetailDTO> getCommentDetailDTOs(String postId, String email) {
        List<Comment> comments = commentRepository.findByPostId(Long.parseLong(postId));
        return createCommentDetailDTOs(comments, email);
    }


    private List<CommentDetailDTO> createCommentDetailDTOs(List<Comment> comments, String email) {
        List<CommentDetailDTO> commentDetailDTOs = new ArrayList<>();

        for (Comment comment : comments) {
            CommentDetailDTO commentDetailDTO = new CommentDetailDTO();
            commentDetailDTO.setId(comment.getId());
            commentDetailDTO.setPostId(comment.getPostId());
            commentDetailDTO.setContents(comment.getContents());
            commentDetailDTO.setNickname(comment.getNickname());
            commentDetailDTO.setCreatedDate(comment.getCreatedDate());
            commentDetailDTO.setEmail(comment.getEmail());
            commentDetailDTO.setAuthor(comment.getEmail().equals(email));

            commentDetailDTOs.add(commentDetailDTO);
        }

        return commentDetailDTOs;
    }
}
